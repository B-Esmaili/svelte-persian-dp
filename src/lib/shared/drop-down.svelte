<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import DropDownItemView from './drop-down-item-view.svelte';
	import type { DropDownItem } from './types';
	import { clickOutside } from '../directives/on-outside-click';
	import { tick } from 'svelte';
	const disp = createEventDispatcher();

	export let items: DropDownItem[];
	export let value: unknown;
	export let label: string;
	let listElement: HTMLElement;

	$: currentValue = items.find((i) => i.value === value);

	function handleItemClick(e: CustomEvent<DropDownItem>) {
		currentValue = e.detail;
		value = e.detail.value;
		open = false;
	}

	let open: boolean = false;

	function onHeaderClick() {
		open = !open;
		if (open) {
			scrollToValue();
		}
	}

	function hideDp() {
		open = false;
	}

	async function scrollToValue() {
		await tick();
		if (!listElement) return;
		const children = listElement.querySelectorAll('li');
		console.log("xxxx");
		children.forEach((item) => {
			const elValue = item.dataset.value;
			if (!elValue) return;
			if (parseInt(elValue) === value) {
				setTimeout(() => {
					listElement.scrollTop = item.offsetTop;
				}, 10);
			}
		});
	}
</script>

<div class="drop-sel" use:clickOutside={hideDp} bind:this={listElement}>
	<div class="label" on:click={onHeaderClick} on:keypress={onHeaderClick}>
		{currentValue?.text ?? label}
	</div>
	{#if open}
		<ul class="dp-item-list" bind:this={listElement}>
			{#each items as item (item.value)} 
				<DropDownItemView selected={item.value === value} model={item} on:click={handleItemClick} />
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.drop-sel {
		border: solid 1px #aaa;
		border-radius: 0.2em;
		position: relative;
		min-width: 5em;
		display: flex;
		align-items: center;
		& .label {
			flex: 1;
			display: flex;
			padding: 0.5em;
			align-items: center;
			justify-content: center;
		}
		& .dp-item-list {
			background-color: #f5f5f5;
			position: absolute;
			top: 100%;
			left: 0;
			padding: 0;
			margin: 0;
			list-style-type: none;
			width: 100%;
			min-width: fit-content;
			border-bottom-right-radius: 0.3em;
			border-bottom-left-radius: 0.3em;
			height: min(100vh, 15em);
			overflow: auto;
		}

		& li {
			padding: 05em;
		}
	}
</style>
