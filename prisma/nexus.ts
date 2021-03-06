/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostWhereUniqueInput: { // input type
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenRootTypes {
  Comment: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
  }
  Mutation: {};
  Post: { // root type
    caption: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    picture?: string | null; // String
  }
  Profile: { // root type
    bio?: string | null; // String
    id: string; // String!
    profilePicture?: string | null; // String
    userId: string; // String!
  }
  Query: {};
  User: { // root type
    email: string; // String!
    id: string; // String!
    name?: string | null; // String
    password: string; // String!
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  DateTime: NexusGenScalars['DateTime'];
}

export interface NexusGenFieldTypes {
  Comment: { // field return type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    post: NexusGenRootTypes['Post']; // Post!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createComment: NexusGenRootTypes['Comment']; // Comment!
    createPost: NexusGenRootTypes['Post']; // Post!
    deleteComment: NexusGenRootTypes['Comment']; // Comment!
    deleteOnePost: NexusGenRootTypes['Post'] | null; // Post
    followUser: NexusGenRootTypes['Profile']; // Profile!
    signin: NexusGenRootTypes['User']; // User!
    signout: NexusGenRootTypes['User']; // User!
    signup: NexusGenRootTypes['User']; // User!
  }
  Post: { // field return type
    caption: string; // String!
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    picture: string | null; // String
    user: NexusGenRootTypes['User']; // User!
  }
  Profile: { // field return type
    bio: string | null; // String
    id: string; // String!
    profilePicture: string | null; // String
    user: NexusGenRootTypes['User']; // User!
    userFollowers: NexusGenRootTypes['User'][]; // [User!]!
    userFollowing: NexusGenRootTypes['User'][]; // [User!]!
    userId: string; // String!
  }
  Query: { // field return type
    getOneUser: NexusGenRootTypes['User']; // User!
    post: NexusGenRootTypes['Post'] | null; // Post
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    email: string; // String!
    followers: NexusGenRootTypes['Profile'] | null; // Profile
    following: NexusGenRootTypes['Profile'] | null; // Profile
    id: string; // String!
    name: string | null; // String
    password: string; // String!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    profile: NexusGenRootTypes['Profile'] | null; // Profile
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      content?: string | null; // String
      postId?: string | null; // String
    }
    createPost: { // args
      caption?: string | null; // String
      picture?: string | null; // String
    }
    deleteComment: { // args
      commentId?: string | null; // String
    }
    deleteOnePost: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    followUser: { // args
      userThatFollowsId?: string | null; // String
      userToFollowId?: string | null; // String
    }
    signin: { // args
      email?: string | null; // String
      password?: string | null; // String
    }
    signup: { // args
      bio?: string | null; // String
      email?: string | null; // String
      name?: string | null; // String
      password?: string | null; // String
      profilePicture?: string | null; // String
    }
  }
  Query: {
    getOneUser: { // args
      userId?: string | null; // String
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Comment" | "Mutation" | "Post" | "Profile" | "Query" | "User";

export type NexusGenInputNames = "PostWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}