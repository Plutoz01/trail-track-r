import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TrailSegmentGroup } from '../../../models/trail-segment-group.model';
import { TrailSegment } from '../../../models/trail-segment.model';
import { Trail } from '../../../models/trail.model';

interface TreeRecord {
  name?: string;
  length?: number;
  type: 'section' | 'segment'
}

@Component({
  selector: 'ttr-trail-details',
  templateUrl: './trail-details.component.html',
  styleUrls: ['./trail-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailDetailsComponent implements OnChanges {
  @Input()
  trail?: Trail;

  treeNodes: TreeNode<TreeRecord>[] = [];

  ngOnChanges({ trail }: SimpleChanges): void {
    if (trail) {
      this.buildTreeNodes(trail.currentValue);
    }
  }

  private buildTreeNodes(trail: Trail): void {
    this.treeNodes = (trail.segmentGroups || [])
      .map(segmentGroup => this.segmentGroupToTreeNode(segmentGroup));
  }

  private readonly segmentGroupToTreeNode = (segmentGroup: TrailSegmentGroup): TreeNode<TreeRecord> => {
    return {
      data: {
        name: segmentGroup.name,
        length: segmentGroup.length,
        type: 'section'
      },
      children: (segmentGroup.segments || []).map(this.segmentToTreeNode)
    };
  };

  private readonly segmentToTreeNode = (segment: TrailSegment): TreeNode<TreeRecord> => {
    return {
      data: {
        name: segment.name,
        length: segment.length,
        type: 'segment'
      }
    };
  };
}
