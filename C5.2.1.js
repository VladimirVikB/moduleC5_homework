const xml = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const parser = new DOMParser();
const xmlString = parser.parseFromString(xml, 'text/xml');

const students = [];
const studentNode = xmlString.querySelectorAll('student');
for (let i = 0; i < studentNode.length; i++) {
  const student = studentNode[i];
  const name = `${student.querySelector('first').textContent} ${student.querySelector('second').textContent}`;
  const age = Number(student.querySelector('age').textContent);
  const prof = student.querySelector('prof').textContent;
  const lang = student.querySelector('name').getAttribute('lang');
  students.push({ name, age, prof, lang });
}

const obj = { list: students };
console.log(obj);