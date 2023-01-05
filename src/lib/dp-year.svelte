<script lang="ts">
	import List from './shared/drop-down.svelte';
	//@ts-ignore
	import persianDate from 'persian-date';
	import type { DropDownItem } from './shared/types';
	
	export const yearRangeBefore = 50;
	export const yearRangeAfter = 50;
	
	const pdate = new persianDate() as any;
	const cur_year = pdate.year();
	export let value = cur_year;

	const startYear = cur_year  - yearRangeBefore;
	const yearList = new Array(yearRangeBefore + yearRangeAfter + 1).fill(0).map((_, i) =>
		(startYear + i).toString()
	);
	const yearOptions = yearList.map(
		(y) =>
			({
				text: y,
				value: parseInt(y)
			} as DropDownItem)
	);

</script>

<List items={yearOptions} bind:value={value} label={yearList[0]} />
