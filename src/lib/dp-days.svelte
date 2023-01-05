<script lang="ts">
	//@ts-ignore
	import PersianDate from 'persian-date';
	import { createEventDispatcher } from 'svelte';
	import DpDay from './dp-day.svelte';
	import { DayType, type Day } from './type';
	const disp = createEventDispatcher();

	export let year: number;
	export let month: number;
	export let value: number;

	const pd = new PersianDate(year, month, 1);
	$: prevMonth = pd.add(-1, 'month');
	$: num_days = pd.daysInMonth(year, month);
	$: num_days_prev_month = pd.daysInMonth(year, prevMonth.month());
	$: firstDayOfMonth = pd.getFirstWeekDayOfMonth(year, month);

	$: thisMonthdays = new Array(num_days).fill(0).map(
		(_, i) =>
			({
				value: i + 1,
				type: DayType.CurrentMonth
			} as Day)
	);

	$: prevMonthDays = new Array(firstDayOfMonth - 1).fill(0).map(
		(_, i) =>
			({
				value: num_days_prev_month - (firstDayOfMonth - 2) + i,
				type: DayType.PrevMonth
			} as Day)
	);

	$: num_prev_curent = 7 - ((num_days + (firstDayOfMonth - 1)) % 7);

	$: nextMonthDays =
		num_prev_curent != 7
			? new Array(num_prev_curent).fill(0).map(
					(_, i) =>
						({
							value: i + 1,
							type: DayType.NextMonth
						} as Day)
			  )
			: [];

	$: allDyas = [...prevMonthDays, ...thisMonthdays, ...nextMonthDays];

	function handleDaySelect(e: CustomEvent<number>) {
		disp('select', e.detail);
	}
</script>

<div class="dp-day-list">
	{#each allDyas as day}
		<DpDay
			value={day}
			on:select={handleDaySelect}
			active={day.value === value && day.type === DayType.CurrentMonth}
		/>
	{/each}
</div>

<style lang="scss">
	.dp-day-list {
		display: flex;
		flex-wrap: wrap;
		width: 21em;
	}
</style>
