<script>
    import { TaskRepository } from './tasks';
    import { onMount, onDestroy } from 'svelte';
    import Task from './Task.svelte';
    
    let tasks = [];

    $: count = tasks.length;
    $: completedCount = tasks.filter(task => task.completed).length;

    const unsubscribe = TaskRepository.subscribe(tasksSub => {
        tasks = tasksSub;
    });

    onMount(() => {
        return TaskRepository.all();
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<section class="section">
    <div class="container">
        
        <p class="subtitle">You have {count} tasks! ({completedCount} completed)</p>
        {#each tasks as task}
            <Task task="{task}" expanded={false} />
        {/each}
    
    </div>
</section>