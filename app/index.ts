import 'foundation-sites';
import $ = require('jquery');
import { WorldEditorModel } from './model/world-editor';
import { WorldSelectorModel } from './model/world-selector';
import { overworld, nether } from 'netherlink/dimension';
import { NLStorage } from 'netherlink/storage';
import * as LocalStorage from 'netherlink/storage/local';
import { WorldSelectorView } from './view/world-selector';
import { PortalListView } from './view/portal-list';
import { AtlasView } from './view/atlas';
import { CoordsInfoView } from './view/coords-info';

$(document).foundation();

window.addEventListener('DOMContentLoaded', (ev) => {
    const storage: NLStorage = LocalStorage.instance;

    const worldSelM = new WorldSelectorModel(storage);
    const worldSelV = new WorldSelectorView(worldSelM);

    const worldEditM = new WorldEditorModel(worldSelM);
    const owPortalsV = new PortalListView(overworld, worldEditM);
    const ntPortalsV = new PortalListView(nether, worldEditM);
    attach('portalsInOverworld', owPortalsV.fragment);
    attach('portalsInNether', ntPortalsV.fragment);
    const owAtlasV   = new AtlasView(overworld, worldEditM);
    const ntAtlasV   = new AtlasView(nether, worldEditM);
    attach('atlasInOverworld', owAtlasV.fragment);
    attach('atlasInNether', ntAtlasV.fragment);
    const owCoordsV  = new CoordsInfoView(overworld, worldEditM);
    const ntCoordsV  = new CoordsInfoView(nether, worldEditM);
    attach('coordsInOverworld', owCoordsV.fragment);
    attach('coordsInNether', ntCoordsV.fragment);

    /* Trigger the resize event manually in order to resize atlases. */
    window.dispatchEvent(new UIEvent("resize"));
});

function attach(id: string, frag: DocumentFragment) {
    const parent = document.getElementById(id)!;
    parent.appendChild(frag);
}
