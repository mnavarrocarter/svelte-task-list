<script>
    import { error, success } from './../../service/notification';
    import { quintOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { TaskRepository } from './tasks';

    export let task;
    export let expanded = false;
    export let isUpdating = false;

    $: completeText = task.completed ? 'Uncomplete' : 'Complete'; 
    $: updatingText = isUpdating ? 'Save' : 'Edit';

    function toggleDetails() {
      expanded = !expanded;    
    }

    function toggleCompleted() {
      task.toggleCompleted();
      TaskRepository.save(task)
      .then(() => {
        success('Task was updated');
      })
      .catch(e => {
        error(e.message);
      });
    }

    function toggleUpdate() {
      isUpdating = !isUpdating;
      if (isUpdating === false) {
      
        const titleEl = document.querySelector(`#taskTitle-${task.id}`);
        const descriptionEl = document.querySelector(`#taskDescription-${task.id}`);

        task.title = titleEl.textContent;
        task.description = descriptionEl !== null ? descriptionEl.textContent : '';
        TaskRepository.save(task)
        .then(() => {
          success('Task was updated');
        })
        .catch(e => {
          error(e.message);
        });
      }
    }

    function deleteTask() {
      TaskRepository.delete(task)
      .then(() => {
        success('Task was deleted');
      })
      .catch(e => {
        error(e.message);
      });
    }
</script>

<div class="card">
  <header class="card-header">
    <p class="card-header-title" id="taskTitle-{task.id}" contenteditable="{isUpdating}">
      { task.title }
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon" on:click="{toggleDetails}">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  {#if expanded }
  <div in:fly={{ duration: 300 }} out:fly={{ duration: 300 }} class="card-content">
    <div class="content" id="taskDescription-{task.id}" contenteditable="{isUpdating}">
      { task.description }
    </div>
  </div>
  {/if }
  <footer class="card-footer">
    <a href="#" on:click="{toggleUpdate}" class="card-footer-item">{updatingText}</a>
    <a href="#" on:click="{toggleCompleted}" class="card-footer-item">{completeText}</a>
    <a href="#" on:click="{deleteTask}" class="card-footer-item">Delete</a>
  </footer>
</div>
<br />