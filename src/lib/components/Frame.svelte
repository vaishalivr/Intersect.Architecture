<script>
  import { FRAME_WIDTH, FRAME_HEIGHT } from "$lib/constants.js";
  import { buildings } from "$lib/data.js";

  console.log(buildings);
</script>

<div class="frame" style="width: {FRAME_WIDTH}px; height: {FRAME_HEIGHT}px;">
  Hello from inside the frame!
</div>

<style>
  .frame {
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
