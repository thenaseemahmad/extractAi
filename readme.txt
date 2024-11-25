Dev ci command

nx watch --all -- nx run-many -t kubectl-apply

nx watch --all -- nx affected -t kubectl-apply

nx affected:build --all --watch --parallel --maxParallel=100                                                                 