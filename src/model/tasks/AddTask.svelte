<script>
    import { error, success } from './../../service/notification';
    import { Task, TaskRepository } from './tasks';
    import uuid from 'uuid';
    
    let task = new Task(uuid.v4(), '');

    $: emptyForm = task.title === '' && task.description === '';    
    $: validForm = task.title !== '' && task.description !== '';

    function createTask() {
      TaskRepository.add(task)
      .then(() => {
        success('Task was created!');
        task = new Task(uuid.v4(), '');
      })
      .catch(e => {
        error(e.message);
      });   
    }

    function clearForm() {
        task.title = '';
        task.description = '';
    }
</script>

<section class="section">
  <div class="container">

    <div class="field is-grouped">
      
      <div class="control">
        <input class="input" placeholder="Task title..." type="text" bind:value={task.title}>
      </div>

      <div class="control is-expanded">
        <input class="input" placeholder="Task description..." type="text" bind:value={task.description}>
      </div>
    
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button on:click="{createTask}" disabled="{!validForm}" class="button is-link">Create</button>
      </div>
      <div class="control">
        <button on:click="{clearForm}" disabled="{emptyForm}" class="button is-text">Clear</button>
      </div>
    </div>

  </div>
</section>
