// app.js
document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTextarea = document.getElementById('note-textarea');
    const notesList = document.getElementById('notes-list');
    const offlineMessage = document.getElementById('offline-message');

    // Функция для добавления заметки
    function addNote(note) {
        const li = document.createElement('li');
        li.className = 'note-item';
        li.innerText = note.text;
        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerText = '×';
        deleteButton.addEventListener('click', () => removeNote(li));
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    }

    // Функция для удаления заметки
    function removeNote(element) {
        element.remove();
    }

    // Событие отправки формы
    noteForm.addEventListener('submit', e => {
        e.preventDefault();
        if (noteTextarea.value.trim() !== '') {
            addNote({ text: noteTextarea.value });
            noteTextarea.value = '';
        }
    });

    // Проверка состояния сети
    window.addEventListener('online', () => {
        offlineMessage.style.display = 'none';
    });

    window.addEventListener('offline', () => {
        offlineMessage.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTextarea = document.getElementById('note-textarea');
    const notesList = document.getElementById('notes-list');
    const offlineMessage = document.getElementById('offline-message');

    // Загрузка заметок из LocalStorage
    function loadNotesFromStorage() {
        let notes = localStorage.getItem('notes');
        if (!notes) {
            notes = [];
        } else {
            notes = JSON.parse(notes);
        }
        return notes;
    }

    // Сохранение заметок в LocalStorage
    function saveNotesToStorage(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Добавление заметки
    function addNote(note) {
        const notes = loadNotesFromStorage();
        notes.push(note);
        saveNotesToStorage(notes);
        renderNotes();
    }

    // Удаление заметки
    function removeNote(index) {
        const notes = loadNotesFromStorage();
        notes.splice(index, 1);
        saveNotesToStorage(notes);
        renderNotes();
    }

    // Отрисовка заметок
    function renderNotes() {
        notesList.innerHTML = '';
        const notes = loadNotesFromStorage();
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.className = 'note-item';
            li.innerText = note.text;
            const deleteButton = document.createElement('span');
            deleteButton.className = 'delete-button';
            deleteButton.innerText = '×';
            deleteButton.addEventListener('click', () => removeNote(index));
            li.appendChild(deleteButton);
            notesList.appendChild(li);
        });
    }

    // Событие отправки формы
    noteForm.addEventListener('submit', e => {
        e.preventDefault();
        if (noteTextarea.value.trim() !== '') {
            addNote({ text: noteTextarea.value });
            noteTextarea.value = '';
        }
    });

    // Проверка состояния сети
    window.addEventListener('online', () => {
        offlineMessage.style.display = 'none';
    });

    window.addEventListener('offline', () => {
        offlineMessage.style.display = 'block';
    });

    // Первоначальная отрисовка заметок
    renderNotes();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service worker registered:', registration.scope);
        }, err => {
            console.error('Service worker registration failed:', err);
        });
    });
}