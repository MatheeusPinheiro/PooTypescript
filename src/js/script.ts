import { ClassRoom, Student } from './classes.js'

const btnAddClassRoom = document.getElementById('adicionarTurma') as HTMLButtonElement;
const btnAddStudent = document.getElementById('adicionarAlunos') as HTMLButtonElement;
const btnInserClassAndStudent = document.getElementById('cadastrar') as HTMLButtonElement;
const modal = document.querySelector('.modal') as HTMLElement;
const closeModal = document.querySelector('.closeModal') as HTMLElement;
const nameClass = document.querySelector('.nome-classe') as HTMLElement;


let classRoom: ClassRoom | null = null;
let mode: 'class' | 'student' = 'student'

//Botão para abrir o modal para cadastrar a classe
btnAddClassRoom.addEventListener('click', () => {
    modal.classList.add('show');
    mode = "class";
    hideStudentFields();
});

//Botão para abrir o modal para cadastrar os alunos
btnAddStudent.addEventListener('click', () => {

    if(!classRoom){
        alert("primeiro cadastre uma turma");
        return;
    }

    modal.classList.add('show');
    mode = "student";
    showStudentFields();
});


btnInserClassAndStudent.addEventListener('click', (event) => {
    event.preventDefault();

    if(mode === 'class'){
        const nameClassRoom = document.getElementById('nomeTurma') as HTMLInputElement;

        if (nameClassRoom.value.trim() === ''){
            alert('Informe um nome da turma');
            return
        }

        classRoom =  new ClassRoom(1, nameClassRoom.value.trim());
        nameClass.innerHTML = classRoom.getName()
        modal.classList.remove('show');
    }

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
    const fields = ['nome', 'idade', 'altura', 'peso'];
    fields.forEach(id => {
        const el = document.getElementById(id) as HTMLElement;
        el.style.display = 'flex';
    })
}

// Esconde os campos do cadastro de estudantes
function hideStudentFields() {
    const fields = ['nome', 'idade', 'altura', 'peso'];
    fields.forEach(id => {
        const el = document.getElementById(id) as HTMLElement;
        el.style.display = 'none';
    })
}