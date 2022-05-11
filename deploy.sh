#!/usr/bin/env sh


#   Config
#   *   *   *   *   *   *   *   *   *   *   *

#   abort on errors
set -e


#   Build app
#   *   *   *   *   *   *   *   *   *   *   *

#   delete prev build
rm -rf dist/

#   build
npm run build


#   Create commit
#   *   *   *   *   *   *   *   *   *   *   *

git add dist/ -f
git commit -m 'deploy'

#   Push commit
#   *   *   *   *   *   *   *   *   *   *   *

#   push
#   git subtree push --prefix dist origin gh-pages
git push origin `git subtree split --prefix dist master`:gh-pages --force


#   After deploy
#   *   *   *   *   *   *   *   *   *   *   *

#   log success
echo 'Deploy completed successfully!'