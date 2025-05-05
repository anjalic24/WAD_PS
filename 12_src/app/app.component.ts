import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTaskTitle = '';
  tasks: { id: number; title: string; completed: boolean }[] = [];
  editingTaskId: number | null = null;
  editedTitle = '';

  addTask() {
    const title = this.newTaskTitle.trim();
    if (title) {
      this.tasks.push({
        id: Date.now(),
        title,
        completed: false
      });
      this.newTaskTitle = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  toggleCompleted(task: any) {
    task.completed = !task.completed;
  }

  startEdit(task: any) {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
  }

  saveEdit(task: any) {
    const title = this.editedTitle.trim();
    if (title) {
      task.title = title;
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.editedTitle = '';
  }
}
