import axios from 'axios';
import YamlToJson from './YamlToJson';

export default async function GitLanguages() {
  const yamlData = await axios.get(
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
  ); //baixa a lista de linguagens yaml do github

  const jsonData = YamlToJson(yamlData.data);
  //converte o yaml em json

  const arrayData = Object.entries(jsonData);
  //converte o json em array

  const filteredArray = arrayData.filter(
    item => item[1].type === 'programming'
  ); //filtra linguagens de programação

  const languages = filteredArray.map(item => item[0]);
  //converte em um array de linguagens

  return languages;
}
