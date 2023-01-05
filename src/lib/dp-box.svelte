<script lang="ts">
	import DpMonth from './dp-month.svelte';
	import DpNext from './dp-next.svelte';
	import DpPrev from './dp-prev.svelte';
	import DpYear from './dp-year.svelte';
	//@ts-ignore
	import PersianDate from 'persian-date';
	import DpDays from './dp-days.svelte';

	let currentDate = new PersianDate();

	$: year_value = currentDate.year();
	$: month_value = currentDate.month();
	$: day_value = currentDate.day();

	$: date = new PersianDate([year_value, month_value, day_value]).format();
	export let plain: boolean;

	function nextMonth() {
		let next_month = new PersianDate([year_value, month_value, day_value]).add(1, 'month');
		year_value = next_month.year();
		month_value = next_month.month();
		day_value = next_month.day();
	}

	function prevMonth() {
		let prev_month = new PersianDate([year_value, month_value, day_value]).add(-1, 'month');
		year_value = prev_month.year();
		month_value = prev_month.month();
		day_value = prev_month.day();
	}

	function handleDaySelect(e: CustomEvent<number>) {
		day_value = e.detail;
	}
</script>

<div class="dp-container" class:plain>
	<div class="header">
		<DpPrev on:click={prevMonth} />
		<div class="selections">
			<div>
				<DpMonth bind:value={month_value} />
			</div>
			<div>
				<DpYear bind:value={year_value} />
			</div>
		</div>
		<DpNext on:click={nextMonth} />
	</div>
	<div class="body">
		<DpDays year={year_value} month={month_value} on:select={handleDaySelect} value={day_value} />
	</div>
</div>

<style lang="scss">
	.dp-container {
		border: solid 1px #aaa;
		padding: 1em;
		display: inline-flex;
		flex-direction: column;
		&:not(.plain) {
			border-radius: 0.5em;
		}

		& .header {
			display: flex;
			justify-content: space-between;
		}
		& .body {
			padding: 0.5em 0;
		}
		& .selections {
			display: flex;
			& > div {
				margin-inline-end: 0.5em;
			}
		}
	}
</style>
