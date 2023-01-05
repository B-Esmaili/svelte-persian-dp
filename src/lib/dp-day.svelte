<script lang="ts">
	import { DayType, type Day } from './type';
	import { store, type DPStore } from './store';
	import { createEventDispatcher } from 'svelte';
	const dist = createEventDispatcher();

    export let active : boolean;    
	export let value: Day;
	let storeValue: DPStore;
	store.subscribe((s) => {
		storeValue = s;
	});

	const handleSelect = (day: Day) => () => {
        if (day.type !== DayType.CurrentMonth){
            return;
        }
		dist('select', day.value);
	};
</script>

{#if storeValue}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="dp-day"
		class:prev={value.type === DayType.PrevMonth}
		class:next={value.type === DayType.NextMonth}
        class:active
		style="--primary-color:{storeValue.theme.primaryColor}; --secondary-color:{storeValue.theme
			.secondaryColor}"
		on:click={handleSelect(value)}
	>
		<span>
			{value.value}
		</span>
	</div>
{/if}

<style lang="scss">
	.dp-day {
		&.prev,
		&.next {
			color: rgb(189, 189, 189);
		}        
		width: 3em;
		height: 3em;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		cursor: pointer;
		& span {
			width: 90%;
			height: 90%;
			background-color: var(--secondary-color);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			&:hover {
				background-color: var(--primary-color);                
			}
		}
        &.active span{
			background-color: var(--primary-color);
        }
	}
</style>
