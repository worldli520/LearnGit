<template>
	<div>
		<div id="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
}
</script>

<style>
/* @import '@/scss/base.scss'; */
@import url(./css/common.css);
</style>
