import { Overworld, Nether, overworld, nether } from 'netherlink/dimension';
import { Portal } from 'netherlink/portal';
import { PortalSet } from 'netherlink/portal/set';
import * as uuid from 'uuid';

// FIXME: remove these
import { Point } from 'netherlink/point';
import Color = require('color');

export type WorldID = string; // UUID v1

export class World {
    public readonly id: WorldID;
    public name: string;
    public readonly portalsOnOverworld: PortalSet<Overworld>;
    public readonly portalsInNether: PortalSet<Nether>;

    public constructor(name: string, id?: WorldID) {
        this.id   = id ? id : uuid.v1();
        this.name = name;
        this.portalsOnOverworld = new PortalSet<Overworld>();
        this.portalsInNether    = new PortalSet<Nether>();

        // FIXME: remove this
        this.portalsOnOverworld.add(
            new Portal<Overworld>(
                overworld,
                new Point(1, 1, 1),
                "Portal #1",
                Color.rgb(100, 100, 0)));

        this.portalsOnOverworld.add(
            new Portal<Overworld>(
                overworld,
                new Point(10, 10, 10),
                "Portal #2",
                Color.rgb(0, 100, 100)));
    }

    /** Compare two worlds by their ID. */
    public static compare(w1: World, w2: World): -1|0|1 {
        const a1 = uuid.parse(w1.id);
        const a2 = uuid.parse(w2.id);

        if      (a1[6] < a2[6]) { return -1 } // time_hi_version[0]
        else if (a1[6] > a2[6]) { return  1 }

        if      (a1[7] < a2[7]) { return -1 } // time_hi_version[1]
        else if (a1[7] > a2[7]) { return  1 }

        if      (a1[4] < a2[4]) { return -1 } // time_mid[0]
        else if (a1[4] > a2[4]) { return  1 }

        if      (a1[5] < a2[5]) { return -1 } // time_mid[1]
        else if (a1[5] > a2[5]) { return  1 }

        if      (a1[0] < a2[0]) { return -1 } // time_low[0]
        else if (a1[0] > a2[0]) { return  1 }

        if      (a1[1] < a2[1]) { return -1 } // time_low[1]
        else if (a1[1] > a2[1]) { return  1 }

        if      (a1[2] < a2[2]) { return -1 } // time_low[2]
        else if (a1[2] > a2[2]) { return  1 }

        if      (a1[3] < a2[3]) { return -1 } // time_low[3]
        else if (a1[3] > a2[3]) { return  1 }

        return 0;
    }
}
