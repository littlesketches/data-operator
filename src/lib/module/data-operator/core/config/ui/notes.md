# Data Operator UI options

This folder contains sub-folders named after their 'UI' mode counterparts. Each contains config and user guidance (i.e. on keys) for punch-in FX (incl. button assignment) and mode+numkey options. Names are referenced in the components for "KeyboardUI.svelte" and "PadUI.svelte".

The chosen UI option is specified in each DO-models "operatorConfig" (see +page.svelte for each DO-model).

**UI options are either tied to instrument configurations; or to a 'user-level' of control vs accessibility**

## 'instant-fun': 
is designed to be streamlined and consistent, with minimal 'group-specific' options. This is (currently) the base/default UI

## 'storyteller':
is designed around data storytelling and analytics?


## 'tweaker'
is designed for sound design(?). This may not be the most useful thing to do, given the interface. Maybe useful for sound designing the DO?

## 'custom-xxx' 
is designed around custom controls for a specific 'instrument' model in strudel, e.g. the DFAM where Group A is assigned to pitch and group B assigned to velocity. 
