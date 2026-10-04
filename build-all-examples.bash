#!/usr/bin/env bash
set -euo pipefail

# This script builds all examples in the projects directory.
# From the root of the repository, run "./build-all-examples.bash"

usage() {
  echo "Usage: $0 [OPTIONS]"
  echo
  echo "Build all examples and display bundle sizes."
  echo
  echo "Options:"
  echo "  --fail-at-end     Keep building the remaining examples after a failure, and report all the failures at the"
  echo "                    very end, after the size sections. Exit non-zero if any build failed. Without this option,"
  echo "                    the script stops at the first failing build. A failure of the shared project always stops"
  echo "                    the script, as all examples depend on it. No effect with --list-size-only, which builds"
  echo "                    nothing."
  echo "  --list-size-only  Skip building, only display bundle sizes from existing dist/ directories"
  echo "  --help            Show this help message"
  return 0
}

LIST_SIZE_ONLY=false
FAIL_AT_END=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --help) usage; exit 0 ;;
    --fail-at-end) FAIL_AT_END=true ;;
    --list-size-only) LIST_SIZE_ONLY=true ;;
    *) echo "Unknown option: $1"; usage; exit 1 ;;
  esac
  shift
done

SHARED_PROJECT_DIR="projects/_shared"

EXAMPLE_DIRS=()
for dir in projects/*; do
  if [[ -d "$dir" && "$dir" != "$SHARED_PROJECT_DIR" ]]; then
    EXAMPLE_DIRS+=("$dir")
  fi
done

print_section_title() {
  echo
  echo "##################################################"
  echo "$1"
  echo "##################################################"
}

FAILED_EXAMPLES=()

if [[ "$LIST_SIZE_ONLY" = true ]]; then
  echo "Skip building examples."
else
  echo "Building all examples..."

  # Built first and outside the loop: npm does not order workspaces by dependency, and building the examples against
  # a stale or missing shared library would give misleading results.
  print_section_title "Building $SHARED_PROJECT_DIR"
  npm run build -w "$SHARED_PROJECT_DIR"

  for dir in "${EXAMPLE_DIRS[@]}"; do
    print_section_title "Building $dir"
    if [[ "$FAIL_AT_END" = true ]]; then
      build_exit_code=0
      npm run build -w "$dir" || build_exit_code=$?
      if [[ "$build_exit_code" -ne 0 ]]; then
        echo "Build of $dir FAILED with exit code $build_exit_code"
        FAILED_EXAMPLES+=("$(basename "$dir") (exit code $build_exit_code)")
      fi
    else
      npm run build -w "$dir"
    fi
  done

  if [[ ${#FAILED_EXAMPLES[@]} -eq 0 ]]; then
    echo "All examples built successfully."
  else
    echo "${#FAILED_EXAMPLES[@]} example(s) failed to build, see the summary at the end."
  fi
fi


for dir in "${EXAMPLE_DIRS[@]}"; do
  print_section_title "Files in $dir/dist directory:"

  if [[ -d "$dir/dist" ]]; then
    # Find all JS files and display sizes with 2 decimal places
    # Use 1000 to match Vite's size display
    find "$dir/dist" -name "*.js" -type f -exec ls -l {} \; | LC_NUMERIC=C awk '{
      # Convert bytes to KB with 2 decimal places
      size_kb = $5 / 1000
      printf "%.2f kB %s\n", size_kb, $9
    }'
  else
    echo "No dist directory found in $dir"
  fi
done

# Sizes are tracked to compare maxGraph versions, so the app code included in the bundles is not a concern as it
# barely changes. All JS files are summed, as some bundlers (Farm) split the maxGraph code across several files.
# Print the size in kB of the JS files to keep for an example.
compute_example_size() {
  local example_dir="$1"
  local find_exclusions=()
  case "$(basename "$example_dir")" in
    # The index file only contains the HTML generation and the app initialization.
    rsbuild-ts) find_exclusions=(-not -name "index.*.js") ;;
  esac
  find "$example_dir/dist" -name "*.js" -type f "${find_exclusions[@]}" -printf '%s\n' | LC_NUMERIC=C awk '
    { total += $1 }
    END { if (NR > 0) printf "%.2f", total / 1000 }
  '
}

# Server and client files of SvelteKit cannot be told apart reliably for now.
SIZE_UNTRACKED_EXAMPLE="sveltekit-ts"
SIZE_EXAMPLE_NAMES=()
SIZE_VALUES=()
for dir in "${EXAMPLE_DIRS[@]}"; do
  example_name="$(basename "$dir")"
  [[ "$example_name" = "$SIZE_UNTRACKED_EXAMPLE" ]] && continue
  example_size=""
  [[ -d "$dir/dist" ]] && example_size=$(compute_example_size "$dir")
  SIZE_EXAMPLE_NAMES+=("$example_name")
  SIZE_VALUES+=("${example_size:-N/A}")
done

print_section_title "Markdown table of bundle sizes"
echo
echo "| Example | before | now |"
echo "| --- | --- | --- |"
for ((i = 0; i < ${#SIZE_EXAMPLE_NAMES[@]}; i++)); do
  size="${SIZE_VALUES[$i]}"
  [[ "$size" != "N/A" ]] && size="$size kB"
  echo "| ${SIZE_EXAMPLE_NAMES[$i]} | kB | $size |"
done

print_section_title "CSV of bundle sizes (kB)"
echo
(IFS=,; echo "${SIZE_EXAMPLE_NAMES[*]}"; echo "${SIZE_VALUES[*]}")

if [[ ${#FAILED_EXAMPLES[@]} -gt 0 ]]; then
  print_section_title "Failed builds"
  echo
  for failed_example in "${FAILED_EXAMPLES[@]}"; do
    echo "- $failed_example"
  done
  echo
  echo "${#FAILED_EXAMPLES[@]} example(s) failed to build."
  exit 1
fi
