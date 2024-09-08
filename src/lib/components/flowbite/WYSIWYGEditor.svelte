<script lang="ts">
	import { Textarea, Toolbar, ToolbarGroup, ToolbarButton, Button } from 'flowbite-svelte';
	import {
		PaperClipOutline,
		MapPinAltSolid,
		ImageOutline,
		CodeOutline,
		FaceGrinOutline,
		PaperPlaneOutline
	} from 'flowbite-svelte-icons';
	// TODO: make more dynamic
</script>

<form>
	<label for="editor" class="sr-only">Publish post</label>
	<Textarea id="editor" rows="8" class="mb-4" placeholder="Write a comment">
		<Toolbar slot="header" embedded>
			<ToolbarGroup>
				<ToolbarButton name="Attach file"
					><PaperClipOutline class="h-6 w-6 rotate-45" /></ToolbarButton
				>
				<ToolbarButton name="Embed map"><MapPinAltSolid class="h-6 w-6" /></ToolbarButton>
				<ToolbarButton name="Upload image"><ImageOutline class="h-6 w-6" /></ToolbarButton>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton name="Format code"><CodeOutline class="h-6 w-6" /></ToolbarButton>
				<ToolbarButton name="Add emoji"><FaceGrinOutline class="h-6 w-6" /></ToolbarButton>
			</ToolbarGroup>
			<ToolbarButton name="send" slot="end"
				><PaperPlaneOutline class="h-6 w-6 rotate-45" /></ToolbarButton
			>
		</Toolbar>
	</Textarea>
	<Button>Publish post</Button>
</form>
