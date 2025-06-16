<script lang="ts" setup>
const classicConfig = {
  default: "#249782",
  swatches: [
    "rgba(255, 255, 255, 1)",
    "rgba(248, 250, 252, 0.95)",
    "rgba(241, 245, 249, 0.9)",
    "rgba(226, 232, 240, 0.85)",
    "rgba(44, 62, 80, 0.95)",
    "rgba(52, 73, 94, 0.9)",
    "rgba(44, 62, 80, 0.85)",
    "rgba(36, 151, 130, 1)",
    "rgba(36, 151, 130, 0.95)",
    "rgba(36, 151, 130, 0.9)",
    "rgba(36, 151, 130, 0.85)",
    "rgba(36, 151, 130, 0.8)",
    "rgba(36, 151, 130, 0.75)",
    "rgba(36, 151, 130, 0.7)"
  ],

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsva: true,
      input: true,
      clear: true,
      save: true
    }
  }
};

const nanoConfig = {
  default: "#249782",
  swatches: [
    "rgba(255, 255, 255, 1)",
    "rgba(248, 250, 252, 0.95)",
    "rgba(241, 245, 249, 0.9)",
    "rgba(44, 62, 80, 0.95)",
    "rgba(52, 73, 94, 0.9)",
    "rgba(44, 62, 80, 0.85)",
    "rgba(36, 151, 130, 1)"
  ],
  defaultRepresentation: "HEXA",
  components: {
    preview: true,
    opacity: true,
    hue: true,

    interaction: {
      hex: false,
      rgba: false,
      hsva: false,
      input: true,
      clear: true,
      save: true
    }
  }
};

const optionDemoConfig = {
  default: "#249782",
  components: {
    preview: true,
    interaction: {
      clear: true,
      save: true
    }
  }
};

const switchConfig = {
  default: "#249782",
  swatches: [
    "rgba(255, 255, 255, 1)",
    "rgba(248, 250, 252, 0.95)",
    "rgba(241, 245, 249, 0.9)",
    "rgba(44, 62, 80, 0.95)",
    "rgba(52, 73, 94, 0.9)",
    "rgba(44, 62, 80, 0.85)",
    "rgba(36, 151, 130, 1)"
  ],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      clear: true,
      save: true
    }
  }
};

const opacityAndHueConfig = {
  default: "#249782",
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      clear: true,
      save: true
    }
  }
};

const pickerWithInputConfig = {
  default: "#249782",
  swatches: [
    "rgba(36, 151, 130, 1)",
    "rgba(44, 62, 80, 0.95)",
    "rgba(52, 73, 94, 0.9)",
    "rgba(44, 62, 80, 0.85)",
    "rgba(52, 73, 94, 0.8)",
    "rgba(44, 62, 80, 0.75)",
    "rgba(52, 73, 94, 0.7)"
  ],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      input: true,
      clear: true,
      save: true
    }
  }
};

const pickerFormatConfig = {
  default: "#249782",
  swatches: [
    "rgba(36, 151, 130, 1)",
    "rgba(44, 62, 80, 0.95)",
    "rgba(52, 73, 94, 0.9)",
    "rgba(44, 62, 80, 0.85)",
    "rgba(52, 73, 94, 0.8)",
    "rgba(44, 62, 80, 0.75)",
    "rgba(52, 73, 94, 0.7)"
  ],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      hsva: true,
      input: true,
      clear: true,
      save: true
    }
  }
};
</script>
<template>
  <div class="grid grid-cols-1 gap-x-5 xl:grid-cols-3">
    <TCard title="Monolith Demo">
      <p class="mb-4">
        Use
        <code class="text-xs text-pink-500 select-all">theme="monolith"</code>
        prop and followed config in
        <code class="text-xs text-pink-500 select-all">config</code> prop.
      </p>

      <TColorPicker theme="monolith" />
    </TCard>
    <TCard title="Classic Demo">
      <p class="mb-4">
        Use
        <code class="text-xs text-pink-500 select-all">theme="classic"</code>
        prop and followed config in
        <code class="text-xs text-pink-500 select-all">config</code> prop.
      </p>

      <TColorPicker theme="classic" :config="classicConfig" />
    </TCard>
    <TCard title="Nano Demo">
      <p class="mb-4">
        Use
        <code class="text-xs text-pink-500 select-all">theme="nano"</code>
        prop and followed config in
        <code class="text-xs text-pink-500 select-all">config</code> prop.
      </p>

      <TColorPicker theme="nano" :config="nanoConfig" />
    </TCard>
    <TCard title="Option Demo">
      <p class="mb-4">
        Give proper options in
        <code class="text-xs text-pink-500 select-all">config</code>
        prop.
      </p>
      <TColorPicker theme="monolith" :config="optionDemoConfig" />
    </TCard>
    <TCard title="Switches">
      <p class="mb-4">
        Give proper options in
        <code class="text-xs text-pink-500 select-all">config</code>
        prop.
      </p>
      <TColorPicker theme="monolith" :config="switchConfig" />
    </TCard>
    <TCard title="Picker with opacity & hue">
      <p class="mb-4">
        Give proper options in
        <code class="text-xs text-pink-500 select-all">config</code>
        prop.
      </p>
      <TColorPicker theme="monolith" :config="opacityAndHueConfig" />
    </TCard>
    <TCard title="Picker with Input">
      <p class="mb-4">
        Give proper options in
        <code class="text-xs text-pink-500 select-all">config</code>
        prop.
      </p>
      <TColorPicker theme="monolith" :config="pickerWithInputConfig" />
    </TCard>
    <TCard title="Color Format">
      <p class="mb-4">
        Give proper options in
        <code class="text-xs text-pink-500 select-all">config</code>
        prop.
      </p>
      <TColorPicker theme="monolith" :config="pickerFormatConfig" />
    </TCard>
  </div>
</template>
