<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
    
  let task = { title: '', description: ''};

  $: emptyForm = task.title === '' && task.description === '';
  $: validForm = task.title !== '' && task.description !== '';

  function submitTask() {
      dispatch('task-added', task);
      resetForm();
  }

  function resetForm() {
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
        <button on:click="{submitTask}" disabled="{!validForm}" class="button is-link">Create</button>
      </div>
      <div class="control">
        <button on:click="{resetForm}" disabled="{emptyForm}" class="button is-text">Clear</button>
      </div>
    </div>

  </div>
</section>
