import { ClassRoom, Student } from './classes.js'

const btnAddClassRoom = document.getElementById('adicionarTurma') as HTMLButtonElement;
const btnAddStudent = document.getElementById('adicionarAlunos') as HTMLButtonElement;
const btnInserClassAndStudent = document.getElementById('cadastrar') as HTMLButtonElement;
const btnLoadingStudents = document.getElementById('carregarAlunos') as HTMLButtonElement;
const modal = document.querySelector('.modal') as HTMLElement;
const closeModal = document.querySelector('.closeModal') as HTMLElement;
const nameClass = document.querySelector('.nome-classe') as HTMLElement;
const quantityStudents = document.getElementById('qtdAlunos') as HTMLElement;
const mediaHeightStudents = document.getElementById('mediaAltura') as HTMLElement;
const mediaWeightStudents = document.getElementById('mediaPeso') as HTMLElement;
const mediaAgeStudents = document.getElementById('mediaIdade') as HTMLElement;
const tbody = document.querySelector('#table tbody') as HTMLTableSectionElement;


let classRoom: ClassRoom | null = null;
let mode: 'class' | 'student' = 'student';

type RandomUser = {
    results: {
        name: { first: string; last: string; };
        dob: { age: number; };
        picture: { thumbnail: string; };
    }[];
}


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
btnLoadingStudents.addEventListener('click', async () => {
    if (!classRoom) {
        alert("primeiro cadastre uma turma");
        return;
    };

    const quantityStudents = prompt('Informe a quantidade de alunos');

    const response = await fetch(`https://randomuser.me/api/?results=${quantityStudents}&nat=br`);
    const data: RandomUser = await response.json();

    data.results.forEach(item => {
        const fullName = `${item.name.first} ${item.name.last}`;
        const age = item.dob.age;
        const height = parseFloat((Math.random() * (1.90 - 1.50) + 1.50).toFixed(2));
        const weight = parseFloat((Math.random() * (100 - 45) + 45).toFixed(1));

        tbody.innerHTML = '';
        const nextId = (classRoom?.getNumStudents() ?? 0) + 1;
        let student = new Student(nextId, fullName, age, height, weight);

        classRoom?.setAddStudent(student);
        updateStatistics();
    });
});



btnInserClassAndStudent.addEventListener('click', (event) => {
    event.preventDefault();

    if (mode === 'class') {
        const nameClassRoom = document.getElementById('nomeTurma') as HTMLInputElement;

        if (nameClassRoom.value.trim() === '') {
            alert('Informe um nome da turma');
            return
        }

        classRoom = new ClassRoom(1, nameClassRoom.value.trim());
        nameClass.innerHTML = classRoom.getName()
        modal.classList.remove('show');
    }

    if (mode === 'student') {

        const nameStudentInput = document.getElementById('nome') as HTMLInputElement;
        const ageStudentInput = document.getElementById('idade') as HTMLInputElement;
        const heightStudentInput = document.getElementById('altura') as HTMLInputElement;
        const weightStudentInput = document.getElementById('peso') as HTMLInputElement;

        const nextId = (classRoom?.getNumStudents() ?? 0) + 1;

        let student = new Student(
            nextId,
            nameStudentInput.value.trim(),
            parseInt(ageStudentInput.value),
            parseFloat(heightStudentInput.value),
            parseFloat(weightStudentInput.value)
        )

        classRoom?.setAddStudent(student);

        [nameStudentInput, ageStudentInput, heightStudentInput, weightStudentInput].forEach(item => item.value = '');
        modal.classList.remove('show');

        updateStatistics();
    };
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
        const el = document.getElementById(id) as HTMLElement;
        el.style.display = 'flex';
    })
}

// Esconde os campos do cadastro de estudantes
function hideStudentFields() {
    const fields = ['nomeCampo', 'idadeCampo', 'alturaCampo', 'pesoCampo'];
    fields.forEach(id => {
        const el = document.getElementById(id) as HTMLElement;
        el.style.display = 'none';
    })
}


// Criar a tabela
function renderTable() {
    const data = classRoom?.getListStudents();
    data?.forEach((item) => {
        const tr = document.createElement('tr') as HTMLTableRowElement;

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
            `
        tbody.appendChild(tr);
    });
    addDeleteEvent();
}


function updateStatistics() {
    if (classRoom) {
        quantityStudents.innerText = classRoom?.getNumStudents().toString();
        mediaHeightStudents.innerText = classRoom.getMediaHeight().toFixed(2);
        mediaWeightStudents.innerText = classRoom.getMediaWeight().toFixed(2);
        mediaAgeStudents.innerText = classRoom.getMediaAge().toFixed(2);
    }

    tbody.innerHTML = ""
    renderTable();

}


function addDeleteEvent() {
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const target = event.currentTarget as HTMLButtonElement;
            const id = parseInt(target.getAttribute('data-id') || '0');

            if (id) {
                deleteRow(id);
            }
        });
    });
}

function deleteRow(id: number) {
    const remove = classRoom?.setRemoveStudent(id);
    if (remove) {
        renderTable();
        updateStatistics();
    }
}