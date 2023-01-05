<script lang="ts">
	import DpBox from './dp-box.svelte';
	import type { DPOptions } from './type';
	import type { DPStore } from './store';
	import { store } from './store';

	export let options: DPOptions | undefined;

	store.update((value: DPStore) => {
		return !options
			? value
			: {
					...value,
					theme: options.theme
			  };
	});
</script>

<div class="date-picker">
	<DpBox plain={false} />
</div>
