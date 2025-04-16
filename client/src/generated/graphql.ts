import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type LogInInput = {
  code: Scalars['String']['input'];
};

export type Movie = {
  __typename?: 'Movie';
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  id: Scalars['ID']['output'];
  imdbId?: Maybe<Scalars['String']['output']>;
  isSaved?: Maybe<Scalars['Boolean']['output']>;
  originalId: Scalars['Int']['output'];
  poster?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type MovieInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  genres?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id: Scalars['ID']['input'];
  imdbId?: InputMaybe<Scalars['String']['input']>;
  originalId: Scalars['Int']['input'];
  poster?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MovieResponse = {
  __typename?: 'MovieResponse';
  movies: Array<Movie>;
  page: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  totalResults: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteMovie?: Maybe<Scalars['String']['output']>;
  logIn: Viewer;
  logOut: Viewer;
  saveMovie?: Maybe<Scalars['String']['output']>;
};


export type MutationDeleteMovieArgs = {
  movieId: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLogInArgs = {
  input?: InputMaybe<LogInInput>;
};


export type MutationSaveMovieArgs = {
  movie?: InputMaybe<MovieInput>;
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String']['output'];
  availableMovies: Array<Movie>;
  searchMovies: MovieResponse;
  user: User;
};


export type QuerySearchMoviesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  viewerId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SavedMovie = {
  __typename?: 'SavedMovie';
  id: Scalars['ID']['output'];
  movie: Movie;
  movieId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  savedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type SavedMoviesResponse = {
  __typename?: 'SavedMoviesResponse';
  result: Array<SavedMovie>;
  total: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  contact: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  income?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  savedMovies?: Maybe<SavedMoviesResponse>;
};


export type UserSavedMoviesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']['output']>;
  didRequest: Scalars['Boolean']['output'];
  hasWallet?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type DeleteMovieMutationVariables = Exact<{
  movieId: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie?: string | null };

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasWallet?: boolean | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasWallet?: boolean | null, didRequest: boolean } };

export type SaveMovieMutationVariables = Exact<{
  movie?: InputMaybe<MovieInput>;
  userId: Scalars['ID']['input'];
}>;


export type SaveMovieMutation = { __typename?: 'Mutation', saveMovie?: string | null };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type AvailableMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableMoviesQuery = { __typename?: 'Query', availableMovies: Array<{ __typename?: 'Movie', id: string, originalId: number, imdbId?: string | null, title: string, rating?: number | null, description?: string | null, poster?: string | null, releaseDate?: string | null, genres?: Array<number | null> | null }> };

export type SearchMoviesQueryVariables = Exact<{
  title: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  viewerId?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchMoviesQuery = { __typename?: 'Query', searchMovies: { __typename?: 'MovieResponse', totalPages: number, totalResults: number, page: number, movies: Array<{ __typename?: 'Movie', id: string, originalId: number, imdbId?: string | null, title: string, rating?: number | null, description?: string | null, poster?: string | null, releaseDate?: string | null, genres?: Array<number | null> | null, isSaved?: boolean | null }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  moviesPage: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, savedMovies?: { __typename?: 'SavedMoviesResponse', total: number, result: Array<{ __typename?: 'SavedMovie', id: string, userId: string, movieId: string, savedAt: string, notes?: string | null, rating?: number | null, movie: { __typename?: 'Movie', id: string, originalId: number, imdbId?: string | null, genres?: Array<number | null> | null, title: string, poster?: string | null, rating?: number | null, releaseDate?: string | null, description?: string | null, isSaved?: boolean | null } }> } | null } };


export const DeleteMovieDocument = gql`
    mutation deleteMovie($movieId: Int!, $userId: ID!) {
  deleteMovie(movieId: $movieId, userId: $userId)
}
    `;
export type DeleteMovieMutationFn = Apollo.MutationFunction<DeleteMovieMutation, DeleteMovieMutationVariables>;

/**
 * __useDeleteMovieMutation__
 *
 * To run a mutation, you first call `useDeleteMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovieMutation, { data, loading, error }] = useDeleteMovieMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteMovieMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMovieMutation, DeleteMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(DeleteMovieDocument, options);
      }
export type DeleteMovieMutationHookResult = ReturnType<typeof useDeleteMovieMutation>;
export type DeleteMovieMutationResult = Apollo.MutationResult<DeleteMovieMutation>;
export type DeleteMovieMutationOptions = Apollo.BaseMutationOptions<DeleteMovieMutation, DeleteMovieMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LogInInput) {
  logIn(input: $input) {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const SaveMovieDocument = gql`
    mutation saveMovie($movie: MovieInput, $userId: ID!) {
  saveMovie(movie: $movie, userId: $userId)
}
    `;
export type SaveMovieMutationFn = Apollo.MutationFunction<SaveMovieMutation, SaveMovieMutationVariables>;

/**
 * __useSaveMovieMutation__
 *
 * To run a mutation, you first call `useSaveMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMovieMutation, { data, loading, error }] = useSaveMovieMutation({
 *   variables: {
 *      movie: // value for 'movie'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSaveMovieMutation(baseOptions?: Apollo.MutationHookOptions<SaveMovieMutation, SaveMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMovieMutation, SaveMovieMutationVariables>(SaveMovieDocument, options);
      }
export type SaveMovieMutationHookResult = ReturnType<typeof useSaveMovieMutation>;
export type SaveMovieMutationResult = Apollo.MutationResult<SaveMovieMutation>;
export type SaveMovieMutationOptions = Apollo.BaseMutationOptions<SaveMovieMutation, SaveMovieMutationVariables>;
export const AuthUrlDocument = gql`
    query AuthUrl {
  authUrl
}
    `;

/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export function useAuthUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlSuspenseQueryHookResult = ReturnType<typeof useAuthUrlSuspenseQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<AuthUrlQuery, AuthUrlQueryVariables>;
export const AvailableMoviesDocument = gql`
    query availableMovies {
  availableMovies {
    id
    originalId
    imdbId
    title
    rating
    description
    poster
    releaseDate
    genres
  }
}
    `;

/**
 * __useAvailableMoviesQuery__
 *
 * To run a query within a React component, call `useAvailableMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableMoviesQuery(baseOptions?: Apollo.QueryHookOptions<AvailableMoviesQuery, AvailableMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailableMoviesQuery, AvailableMoviesQueryVariables>(AvailableMoviesDocument, options);
      }
export function useAvailableMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailableMoviesQuery, AvailableMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailableMoviesQuery, AvailableMoviesQueryVariables>(AvailableMoviesDocument, options);
        }
export function useAvailableMoviesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AvailableMoviesQuery, AvailableMoviesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AvailableMoviesQuery, AvailableMoviesQueryVariables>(AvailableMoviesDocument, options);
        }
export type AvailableMoviesQueryHookResult = ReturnType<typeof useAvailableMoviesQuery>;
export type AvailableMoviesLazyQueryHookResult = ReturnType<typeof useAvailableMoviesLazyQuery>;
export type AvailableMoviesSuspenseQueryHookResult = ReturnType<typeof useAvailableMoviesSuspenseQuery>;
export type AvailableMoviesQueryResult = Apollo.QueryResult<AvailableMoviesQuery, AvailableMoviesQueryVariables>;
export const SearchMoviesDocument = gql`
    query searchMovies($title: String!, $page: Int, $viewerId: String) {
  searchMovies(title: $title, page: $page, viewerId: $viewerId) {
    movies {
      id
      originalId
      imdbId
      title
      rating
      description
      poster
      releaseDate
      genres
      isSaved
    }
    totalPages
    totalResults
    page
  }
}
    `;

/**
 * __useSearchMoviesQuery__
 *
 * To run a query within a React component, call `useSearchMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMoviesQuery({
 *   variables: {
 *      title: // value for 'title'
 *      page: // value for 'page'
 *      viewerId: // value for 'viewerId'
 *   },
 * });
 */
export function useSearchMoviesQuery(baseOptions: Apollo.QueryHookOptions<SearchMoviesQuery, SearchMoviesQueryVariables> & ({ variables: SearchMoviesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchMoviesQuery, SearchMoviesQueryVariables>(SearchMoviesDocument, options);
      }
export function useSearchMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMoviesQuery, SearchMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchMoviesQuery, SearchMoviesQueryVariables>(SearchMoviesDocument, options);
        }
export function useSearchMoviesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchMoviesQuery, SearchMoviesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchMoviesQuery, SearchMoviesQueryVariables>(SearchMoviesDocument, options);
        }
export type SearchMoviesQueryHookResult = ReturnType<typeof useSearchMoviesQuery>;
export type SearchMoviesLazyQueryHookResult = ReturnType<typeof useSearchMoviesLazyQuery>;
export type SearchMoviesSuspenseQueryHookResult = ReturnType<typeof useSearchMoviesSuspenseQuery>;
export type SearchMoviesQueryResult = Apollo.QueryResult<SearchMoviesQuery, SearchMoviesQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!, $moviesPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    contact
    savedMovies(limit: $limit, page: $moviesPage) {
      total
      result {
        id
        userId
        movieId
        savedAt
        notes
        rating
        movie {
          id
          originalId
          imdbId
          genres
          title
          poster
          rating
          releaseDate
          description
          isSaved
        }
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      moviesPage: // value for 'moviesPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;