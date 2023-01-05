<script lang="ts">
	//@ts-ignore
	import persianDate from 'persian-date';
	import List from './shared/drop-down.svelte';
	const fakeDate = new persianDate();
	//@ts-ignore
	const months = fakeDate.rangeName().months;
	//@ts-ignore
	export let value = fakeDate.month();
	
	$: monthOptions = months.map((m : string , i:number)=>({text : m , value : i + 1}))

</script>

<List items={monthOptions} bind:value={value} label={months[0]}/>

<style lang="scss">
	select {
		height: 48px;
        font-size: 20px;
        text-align: center;
		& option {
			font-size: 25px;
            padding: 1em;
		}
	}
</style>
