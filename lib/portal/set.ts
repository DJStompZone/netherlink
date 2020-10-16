import { Dimension } from 'netherlink/dimension';
import { Point } from 'netherlink/point';
import { Portal } from 'netherlink/portal';

export class PortalSet<D extends Dimension> implements Iterable<Portal<D>> {
    private readonly map: Map<string, Portal<D>>; // toString() of location as a key

    public constructor() {
        this.map = new Map<string, Portal<D>>();
    }

    public get size(): number {
        return this.map.size;
    }

    public [Symbol.iterator](): Iterator<Portal<D>> {
        return this.map.values();
    }

    public add(portal: Portal<D>): this {
        this.map.set(portal.location.toString(), portal);
        return this;
    }

    public delete(portal: Portal<D>): this {
        this.map.delete(portal.location.toString());
        return this;
    }

    public find(loc: Point): Portal<D>|null {
        for (let p of this) {
            if (p.location.equals(loc)) {
                return p;
            }
        }
        return null;
    }

    /** Create a new PortalSet only containing portals within the
     * given area.
     */
    public narrow(area: [Point, Point]): PortalSet<D> {
        const ret = new PortalSet<D>();
        for (let p of this) {
            if (p.location.within(area)) {
                ret.add(p);
            }
        }
        return ret;
    }
}
