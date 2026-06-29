export interface BranchNode {
  id: string;
  parentId: string | null;
  label: string;
  prompt: string;
  output: string;
  timestamp: string;
  depth: number;
}