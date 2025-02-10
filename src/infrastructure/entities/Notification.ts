export enum Project {
  MARKET = 'MARKET',
  PLAZAS = 'PLAZAS',
  TOOLS = 'TOOLS',
}

export enum NotificationTitles {
  POST_COMMENT_REPLY = 'POST_COMMENT_REPLY',
  COMMENT_REPLY = 'COMMENT_REPLY',
  POST_TIP = 'POST_TIP',
  COMMENT_TIP = 'COMMENT_TIP',
  POST_PROPOSALS = 'POST_PROPOSALS',
  POST_PROPOSALS_STATUS = 'POST_PROPOSALS_STATUS',
}

export interface CommentNotificationType {
  postId: string;
  commentId: string;
  parentId?: string;
  creatorId: string;
  name: string;
  image?: string;
  isPlaza: boolean;
  content: string;
}

export interface TipNotificationType {
  postId: string;
  commentId: string;
  amount: number;
  currency: string;
  euroAmount: number;
  dollarAmount: number;
  sender: string;
  name: string;
  image?: string;
  isPlaza: boolean;
}

export interface Notification {
  _id?: string;
  accountId: string;
  title: NotificationTitles;
  message: string;
  params?:
    | CommentNotificationType
    | TipNotificationType
    | PostProposalsNotificationType
    | PostProposalsStatusNotificationType;
  createdAt?: Date;
  project: Project;
  isRead?: boolean;
}

export interface PostProposalsNotificationType {
  postProposalId: string;
  type: string;
  price: number;
  name: string;
  image?: string;
  isPlaza: boolean;
  creatorId: string;
}

export interface PostProposalsStatusNotificationType {
  postProposalId: string;
  name: string;
  image?: string;
  isPlaza: boolean;
  creatorId: string;
}

export interface UpdateNotification {
  ids: string[];
  isRead: boolean;
}
