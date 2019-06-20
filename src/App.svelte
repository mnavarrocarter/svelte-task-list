<script>
  import { Router, Link, Route } from 'svelte-routing';
	import Home from './views/HomeView.svelte';
	import Tasks from './views/TasksView.svelte';

	export let url = '';
</script>

<Router url="{url}">
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <Link getProps={() => { return {class: 'navbar-item'}}} to="/">Home</Link>

      <a role="button" class="navbar-burger burger" href="none" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <Link getProps={() => { return {class: 'navbar-item'}}} to="/tasks">Tasks</Link>
      </div>
    </div>
  </nav>

  <Route path="/" component="{Home}" />
  <Route path="/tasks" component="{Tasks}" />
</Router>