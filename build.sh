mkdir dist
cp -rf built dist/
cp package.json dist/
cp README.md dist/
VERSION=$(jq -r '.version' package.json)
PACKAGE=easytries-$VERSION.tgz
tar -C dist -czf $PACKAGE .
echo $PACKAGE
