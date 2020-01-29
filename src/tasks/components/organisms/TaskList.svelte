<script>
  import Task from '../molecules/Task.svelte';
  import AddTask from '../molecules/AddTask.svelte';
  import notify from '../../../service/notify';
  import tasks from '../../tasks.store';
  import { onMount, onDestroy } from 'svelte';

  let inTasks = [];

  $: count = inTasks.length;
  $: completedCount = inTasks.filter(task => task.completed).length;

  const unsubscribe = tasks.subscribe(storeTasks => {
    inTasks = storeTasks;
  });

  onMount(() => {
    return tasks.all()
        .catch((e) => {
          notify.error(e.message);
        })
  });

  onDestroy(() => {
    unsubscribe();
  });

  function updateTask({detail}) {
    tasks.save(detail)
      .then(() => notify.success('Task was updated'))
      .catch(e => notify.error(e.message));
  }

  function addTask({detail}) {
    const task = tasks.create(detail.title, detail.description);
    tasks.add(task)
      .then(() => notify.success('Task was created'))
      .catch(e => notify.error(e.message));
  }

  function deleteTask({detail}) {
    tasks.delete(detail)
      .then(() => notify.success('Task deleted successfully'))
      .catch(e => notify.error(e.message));
  }
</script>

<AddTask on:task-added={addTask}/>
<section class="section">
  <div class="container">
    <p class="subtitle">You have {count} tasks! ({completedCount} completed)</p>
      {#each inTasks as task (task.id)}
        <Task on:task-updated="{updateTask}" on:task-deleted="{deleteTask}" task="{task}" expanded={false} />
      {/each}
  </div>
</section>
