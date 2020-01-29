<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './views/HomeView.svelte';
  import TaskListTemplate from './tasks/components/templates/TaskListTemplate.svelte';

  export let url = '';

  function getProps() {
    return {
      class: 'navbar-item'
    }
  }
</script>

<Router url="{url}">
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <Link getProps={getProps} to="/">Home</Link>

      <a role="button" class="navbar-burger burger" href="none" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <Link getProps={getProps} to="/tasks">Tasks</Link>
      </div>
    </div>
  </nav>
  <Route path="/" component="{Home}" />
  <Route path="/tasks" component="{TaskListTemplate}" />
</Router>
