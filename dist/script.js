import { ClassRoom, Student } from './classes.js';
const btnAddClassRoom = document.getElementById('adicionarTurma');
const btnAddStudent = document.getElementById('adicionarAlunos');
const btnInserClassAndStudent = document.getElementById('cadastrar');
const btnLoadingStudents = document.getElementById('carregarAlunos');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.closeModal');
const nameClass = document.querySelector('.nome-classe');
const quantityStudents = document.getElementById('qtdAlunos');
const mediaHeightStudents = document.getElementById('mediaAltura');
const mediaWeightStudents = document.getElementById('mediaPeso');
const mediaAgeStudents = document.getElementById('mediaIdade');
const tbody = document.querySelector('#table tbody');
let classRoom = null;
let mode = 'student';
//Botão para abrir o modal para cadastrar a classe
btnAddClassRoom.addEventListener('click', () => {
    modal.classList.add('show');
    mode = "class";
    hideStudentFields();
});
//Botão para abrir o modal para cadastrar os alunos
btnAddStudent.addEventListener('click', () => {
    if (!classRoom) {
        alert("primeiro cadastre uma turma");
        return;
    }
    modal.classList.add('show');
    mode = "student";
    showStudentFields();
});
//Botão para cadastrar os alunos via API
btnLoadingStudents.addEventListener('click', () => {
    if (!classRoom) {
        alert("primeiro cadastre uma turma");
        return;
    }
    ;
});
btnInserClassAndStudent.addEventListener('click', (event) => {
    var _a;
    event.preventDefault();
    if (mode === 'class') {
        const nameClassRoom = document.getElementById('nomeTurma');
        if (nameClassRoom.value.trim() === '') {
            alert('Informe um nome da turma');
            return;
        }
        classRoom = new ClassRoom(1, nameClassRoom.value.trim());
        nameClass.innerHTML = classRoom.getName();
        modal.classList.remove('show');
    }
    if (mode === 'student') {
        const nameStudentInput = document.getElementById('nome');
        const ageStudentInput = document.getElementById('idade');
        const heightStudentInput = document.getElementById('altura');
        const weightStudentInput = document.getElementById('peso');
        const nextId = ((_a = classRoom === null || classRoom === void 0 ? void 0 : classRoom.getNumStudents()) !== null && _a !== void 0 ? _a : 0) + 1;
        let student = new Student(nextId, nameStudentInput.value.trim(), parseInt(ageStudentInput.value), parseFloat(heightStudentInput.value), parseFloat(weightStudentInput.value));
        classRoom === null || classRoom === void 0 ? void 0 : classRoom.setAddStudent(student);
        [nameStudentInput, ageStudentInput, heightStudentInput, weightStudentInput].forEach(item => item.value = '');
        modal.classList.remove('show');
        if (classRoom) {
            quantityStudents.innerText = classRoom === null || classRoom === void 0 ? void 0 : classRoom.getNumStudents().toString();
            mediaHeightStudents.innerText = classRoom.getMediaHeight().toFixed(2);
            mediaWeightStudents.innerText = classRoom.getMediaWeight().toFixed(2);
            mediaAgeStudents.innerText = classRoom.getMediaAge().toFixed(2);
        }
        tbody.innerHTML = "";
        renderTable();
    }
    ;
});
// Ao clicar no icone de X fecha o modal
closeModal.addEventListener('click', () => {
    modal.classList.toggle('show');
    hideStudentFields();
});
// Ao clicar fora do modal fecha o modal
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
        hideStudentFields();
    }
});
// Mostra os campos do cadastro de estudantes
function showStudentFields() {
    const fields = ['nomeCampo', 'idadeCampo', 'alturaCampo', 'pesoCampo'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        el.style.display = 'flex';
    });
}
// Esconde os campos do cadastro de estudantes
function hideStudentFields() {
    const fields = ['nomeCampo', 'idadeCampo', 'alturaCampo', 'pesoCampo'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        el.style.display = 'none';
    });
}
// Criar a tabela
function renderTable() {
    const data = classRoom === null || classRoom === void 0 ? void 0 : classRoom.getListStudents();
    data === null || data === void 0 ? void 0 : data.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${item.getId()}</td>
                <td>${item.getFullName()}</td>
                <td>${item.getAge().toFixed(2)}</td>
                <td>${item.getHeight().toFixed(2)}</td>
                <td>${item.getWeight().toFixed(2)}</td>
                <td>
                    <button type="button" class="btn" data-id="${item.getId()}">Editar</button>
                    <button type="button" class="btn delete" data-id="${item.getId()}">Excluir</button>
                </td>  
            `;
        tbody.appendChild(tr);
    });
}
