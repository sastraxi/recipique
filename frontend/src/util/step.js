export const interpStep = ({ text, local }) => {
  return text.replace(/[$]\w+/g, matched => {
    const variableName = matched.substr(1); // remove the $
    return local.find(l => l.key === variableName).value;
  });
};

