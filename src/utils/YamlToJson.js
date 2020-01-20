import yaml from 'js-yaml';

export default function YamlToJson(ymlData) {
  try {
    return yaml.safeLoad(ymlData);
  } catch (e) {
    return e;
  }
}
