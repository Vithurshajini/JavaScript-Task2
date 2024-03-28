class Student{
    constructor(name, telephone, email){
        this.id='';
        this.name= name;
        this.telephone= telephone;
        this.email = email;
    }
}

const data = [];
let idCounter = 0;

const table={

    storeTable:() => {
        table.renderTable(data);
    },
    renderTable: (students)=>{
        tableBody.innerHTML = '';

        function form(textContent) {
            const cell = document.createElement('td');
            cell.textContent = textContent;
            return cell;
        }

        students.forEach(function(newStudent) {
            const row = document.createElement('tr');

            row.appendChild(form(newStudent.id));
            row.appendChild(form(newStudent.name));
            row.appendChild(form(newStudent.telephone));
            row.appendChild(form(newStudent.email));

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function() {
                document.getElementById('autoIncrementId').value = newStudent.id;
                document.getElementById('name').value = newStudent.name;
                document.getElementById('number').value = newStudent.telephone;
                document.getElementById('email').value = newStudent.email;

                const submitButton = document.querySelector('#myForm button[type="submit"]');
                submitButton.textContent = 'Update';
            });

            const editCell = document.createElement('td');
            editCell.appendChild(editButton);
            row.appendChild(editCell);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('deleteButton');
            deleteButton.dataset.id = newStudent.id;

            const deleteCell=document.createElement('td');
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });

        document.querySelectorAll('.deleteButton').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.stopPropagation();
                const studentId = this.dataset.id;
                openDeleteConfirmationModal(studentId);
            });
        });
    },
    storeDataArray:()=>{
        dataArray.textContent= JSON.stringify(data, null, 2);
    }
};

const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
let studentToDelete;

function openDeleteConfirmationModal(studentId) {
    studentToDelete = studentId;
    deleteConfirmationModal.style.display = 'block';
}

function closeDeleteConfirmationModal() {
    deleteConfirmationModal.style.display = 'none';
}

confirmDeleteButton.addEventListener('click', function () {
    const index = data.findIndex(student => student.id === studentToDelete);
    if (index !== -1) {
        data.splice(index, 1);
        table.storeDataArray();
        table.renderTable(data);
        closeDeleteConfirmationModal();
    }
});

cancelDeleteButton.addEventListener('click', function () {
    closeDeleteConfirmationModal();
});

var closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    document.getElementById("deleteConfirmationModal").style.display = "none";
});

const form = document.getElementById('myForm');
const tableBody = document.getElementById('tableBody');
const dataArray = document.getElementById('dataArray');
const autoIncrementIdInput = document.getElementById('autoIncrementId');
const searchBar = document.getElementById('searchBar');
const filterButton = document.getElementById('filterButton');

window.onload = function() {
    autoIncrementIdInput.value = 'SN001';
};

form.addEventListener('submit', addOrUpdateStudent);

function addOrUpdateStudent(event){
    event.preventDefault();

    const id = document.getElementById('autoIncrementId').value;
    const name = document.getElementById('name').value;
    const telephone = document.getElementById('number').value;
    const email = document.getElementById('email').value;

    if (form.querySelector('button[type="submit"]').textContent === 'Submit') {
        idCounter++;
        const newStudent= new Student(name,telephone,email);
        newStudent.id = 'SN' + ('000' + idCounter).slice(-3);
        data.push(newStudent);
    }
    else if (form.querySelector('button[type="submit"]').textContent === 'Update') {
        const updatedStudent = data.find(student => student.id === id);
        updatedStudent.name = name;
        updatedStudent.telephone = telephone;
        updatedStudent.email = email;
    }

    const submitButton = document.querySelector('#myForm button[type="submit"]');
    submitButton.textContent = 'Submit';

    table.storeTable();
    form.reset();
    table.storeDataArray();
    autoIncrementIdInput.value = 'SN' + ('000' + (idCounter + 1)).slice(-3); 
}

filterButton.addEventListener('click', function() {
    const searchText = searchBar.value.toLowerCase();
    const filteredData = data.filter(newStudent=>
        newStudent.name.toLowerCase().includes(searchText) ||
        newStudent.telephone.toLowerCase().includes(searchText) ||
        newStudent.email.toLowerCase().includes(searchText)
    );
    table.renderTable(filteredData);
});
