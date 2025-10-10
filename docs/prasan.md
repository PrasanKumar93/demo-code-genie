# delete all local branches that are not on remote

git fetch -p && for b in $(git branch --format='%(refname:short)'); do [ "$b" != "$(git branch --show-current)" ] && ! git show-ref --verify --quiet refs/remotes/origin/$b && git branch -D "$b"; done
