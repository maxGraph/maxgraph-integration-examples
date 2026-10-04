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
