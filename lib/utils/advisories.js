module.exports = function advisories(audit) {
  const list = Object.values(audit.advisories);

  return {
    find: (name, version) => {
      return (
        list.find(a => a.module_name === name && a.findings.find(f => f.version === version)) || {}
      );
    },
  };
};
