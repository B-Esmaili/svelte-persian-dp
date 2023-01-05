<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import type { DropDownItem } from './types';

	export let model: DropDownItem;
	export let selected = false
	const disp = createEventDispatcher();

	function handleClick() {
		disp('click', model);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="dp-list-item" on:click={handleClick} data-value={model.value} class:selected>
	{model.text}
</li>

<style lang="scss">
    li{
		padding: 0.5em;
		text-align: center;
		cursor: pointer;
		&.selected{
			background-color: #00f;
			color:#fff;
		}
	}
</style>