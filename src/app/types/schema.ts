export type Maybe<T> = T | null;


export interface ChannelInput {

  name: string;

  groupId: string;
}

export interface FilterInput {

  field: string;

  value: string;
}

export interface SearchTermInput {

  fields: string[];

  value: string;

  match?: Maybe<SearchTermMatch>;
}

export interface GroupInput {

  name: string;
}

export interface MeetingInput {

  name: string;

  from: string;

  to: string;

  channelId: string;
}

  export enum SearchTermMatch {
    Like = "LIKE",
    Exact = "EXACT",
  }


export type Upload = any;




// ====================================================
// Scalars
// ====================================================







// ====================================================
// Types
// ====================================================



export interface ChannelsQuery {

  read?: Maybe<Channel>;
}


export interface ChannelsMutation {

  create?: Maybe<Channel>;

  update?: Maybe<Channel>;
}


export interface Channel {

  id?: Maybe<string>;

  name?: Maybe<string>;

  groupId?: Maybe<string>;

  meetings?: Maybe<(Maybe<Meeting>)[]>;
}


export interface PageInfo {

  endCursor?: Maybe<string>;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  startCursor?: Maybe<string>;
}


export interface FilterOption {

  value: string;

  text: string;
}


export interface FilterSetting {

  field: string;

  text: string;

  options: (Maybe<FilterOption>)[];

  multi: boolean;
}


export interface OrderSetting {

  field: string;

  text: string;
}


export interface FindSettings {

  searchableFields: (Maybe<string>)[];

  filters: (Maybe<FilterSetting>)[];

  orders: (Maybe<OrderSetting>)[];
}


export interface GroupsQuery {

  read?: Maybe<Group>;

  find: GroupsConnection;

  findSettings: FindSettings;
}


export interface GroupsMutation {

  create?: Maybe<Group>;

  update?: Maybe<Group>;
}


export interface Group {

  id?: Maybe<string>;

  name?: Maybe<string>;

  channels?: Maybe<(Maybe<Channel>)[]>;
}


export interface GroupsConnection {

  pageInfo: PageInfo;

  edges: (Maybe<GroupEdge>)[];

  totalCount: number;
}


export interface GroupEdge {

  cursor: string;

  node: Group;
}


export interface MeetingsQuery {

  read?: Maybe<Meeting>;
}


export interface MeetingsMutation {

  create?: Maybe<Meeting>;

  update?: Maybe<Meeting>;
}


export interface Meeting {

  id?: Maybe<string>;

  name?: Maybe<string>;

  from?: Maybe<string>;

  to?: Maybe<string>;

  channelId?: Maybe<string>;
}


export interface Query {

  groups?: Maybe<GroupsQuery>;

  channels?: Maybe<ChannelsQuery>;

  meetings?: Maybe<MeetingsQuery>;
}


export interface Mutation {

  groups?: Maybe<GroupsMutation>;

  channels?: Maybe<ChannelsMutation>;

  meetings?: Maybe<MeetingsMutation>;
}



// ====================================================
// Arguments
// ====================================================

export interface ReadChannelsQueryArgs {

  Id: string;
}
export interface CreateChannelsMutationArgs {

  channel?: Maybe<ChannelInput>;
}
export interface UpdateChannelsMutationArgs {

  id: string;

  channel?: Maybe<ChannelInput>;
}
export interface ReadGroupsQueryArgs {

  id: string;
}
export interface FindGroupsQueryArgs {

  first?: Maybe<number>;

  after?: Maybe<string>;

  last?: Maybe<number>;

  before?: Maybe<string>;

  searchTerms?: SearchTermInput[];

  filters?: FilterInput[];

  order?: Maybe<string>;
}
export interface CreateGroupsMutationArgs {

  group?: Maybe<GroupInput>;
}
export interface UpdateGroupsMutationArgs {

  id: string;

  group?: Maybe<GroupInput>;
}
export interface ReadMeetingsQueryArgs {

  Id: string;
}
export interface CreateMeetingsMutationArgs {

  meeting?: Maybe<MeetingInput>;
}
export interface UpdateMeetingsMutationArgs {

  id: string;

  meeting?: Maybe<MeetingInput>;
}


