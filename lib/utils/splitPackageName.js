/**
 * @param {string} packageName
 * @returns {{ name: string, fullName: string, location: string | null }}
 */
export default function splitPackageName(packageName) {
  const [location, name] = packageName.split(":", 2);
  if (name && location) {
    return { name, fullName: packageName, location: name === location ? null : location };
  }
  throw new TypeError(`invalid package: "${packageName}"`);
}
