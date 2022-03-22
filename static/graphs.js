export const REDDIT_GRAPH = {
  nodes: [
    {
      name: "post",
      df: "post_author_subreddits",
      features: [
        {
          feature_name: "id",
          column_name: "post_id",
        },
        {
          feature_name: "title",
          column_name: "post_title",
        },
        {
          feature_name: "time",
          column_name: "post_created_utc",
        },
      ],
    },
    {
      name: "author",
      df: "authors",
      features: [
        {
          feature_name: "id",
          column_name: "author",
        },
      ],
      parent: {},
    },
    {
      name: "comment",
      df: "comments",
      features: [
        {
          feature_name: "id",
          column_name: "comment_id",
        },
        {
          feature_name: "body",
          column_name: "comment_body",
        },
        {
          feature_name: "time",
          column_name: "comment_created_utc",
        },
        {
          feature_name: "parent_id",
          column_name: "comment_parent_id",
        },
      ],
      parent: {
        df: "comments",
        features: [
          {
            feature_name: "id",
            column_name: "comment_id",
          },
          {
            feature_name: "parent_id",
            column_name: "comment_parent_id",
          },
        ],
      },
    },
    {
      name: "subreddit",
      df: "post_author_subreddits",
      features: [
        {
          feature_name: "id",
          column_name: "subreddit_id",
        },
        {
          feature_name: "title",
          column_name: "subreddit",
        },
      ],
    },
  ],
  edges: [
    {
      name: "post_author",
      df: "post_author_subreddits",
      source: "post",
      target: "author",
    },
    {
      name: "post_subreddit",
      df: "post_author_subreddits",
      source: "post",
      target: "subreddit",
    },
    {
      name: "post_comment",
      df: "comments",
      source: "post",
      target: "comment",
    },
    {
      name: "comment_comment",
      df: "comments",
      source: "comment",
      target: "comment",
      self_edge: true,
    },
    {
      name: "author_comment",
      df: "comments",
      source: "author",
      target: "comment",
    },
  ],
  main_node: "post",
  node_to_calculate_repitition: "comment",
  emb: [
    {
      node: "post",
      feature: "title",
      model: "XLNetTokenizer",
      min_number_of_words: 1,
    },
    {
      node: "comment",
      feature: "body",
      model: "XLNetTokenizer",
      min_number_of_words: 1,
    },
    {
      node: "subreddit",
      feature: "title",
      model: "XLNetTokenizer",
      min_number_of_words: 1,
    },
  ],
  weight: {
    df: "post_author_subreddits",
    feature: "post_created_utc",
  },
  weight_split_range: {
    train_range: {
      start: 1293924080,
      end: 1293930237,
    },
    valid_range: {
      start: 1293930237,
      end: 1293939316,
    },
    test_range: {
      start: 1293939316,
      end: 1293944394,
    },
  },
};

export const OAG = {
  nodes: [
    {
      name: "paper",
      df: "papers_venues.tsv",
      features: [
        {
          feature_name: "id",
          column_name: "paper_id",
        },
        {
          feature_name: "title",
          column_name: "normalized_title",
        },
        {
          feature_name: "time",
          column_name: "publish_year",
        },
      ],
      parent: {
        df: "papers_papers.tsv",
        features: [
          {
            feature_name: "id",
            column_name: "paper_id",
          },
          {
            feature_name: "parent_id",
            column_name: "paper_parent_id",
          },
        ],
      },
    },
    {
      name: "author",
      df: "papers_authors_affiliations.tsv",
      features: [
        {
          feature_name: "id",
          column_name: "author_id",
        },
      ],
    },
    {
      name: "venue",
      df: "venues.tsv",
      features: [
        {
          feature_name: "id",
          column_name: "venue_id",
        },
        {
          feature_name: "name",
          column_name: "venue_name",
        },
        {
          feature_name: "node_emb",
          column_name: "venue_emb",
        },
      ],
      node_emb_sep: " ",
    },
    {
      name: "field",
      df: "fields.tsv",
      features: [
        {
          feature_name: "id",
          column_name: "field_id",
        },
        {
          feature_name: "name",
          column_name: "field_name",
        },
        {
          feature_name: "node_emb",
          column_name: "field_emb",
        },
      ],
      node_emb_sep: " ",
      parent: {
        df: "fields_hierarchy.tsv",
        features: [
          {
            feature_name: "id",
            column_name: "field_id",
          },
          {
            feature_name: "parent_id",
            column_name: "field_parent_id",
          },
        ],
      },
    },
    {
      name: "affiliation",
      df: "affiliations.tsv",
      features: [
        {
          feature_name: "id",
          column_name: "affiliation_id",
        },
        {
          feature_name: "name",
          column_name: "affiliation_name",
        },
        {
          feature_name: "node_emb",
          column_name: "affiliation_emb",
        },
      ],
      node_emb_sep: " ",
    },
  ],
  edges: [
    {
      name: "paper_paper",
      df: "papers_papers.tsv",
      source: "paper",
      target: "paper",
      self_edge: true,
    },
    {
      name: "field_field",

      df: "fields_hierarchy.tsv",
      source: "field",
      target: "field",
      self_edge: true,
    },
    {
      name: "paper_author",

      df: "papers_authors_affiliations.tsv",
      source: "paper",
      target: "author",
      edge_type_feature: "author_position",
    },
    {
      name: "paper_field",

      df: "papers_fields.tsv",
      source: "paper",
      target: "field",
      edge_type_feature: "level",
    },
    {
      name: "paper_venue",

      df: "papers_venues.tsv",
      source: "paper",
      target: "venue",
      edge_type_feature: "venue_type",
    },
    {
      name: "author_affiliation",

      df: "papers_authors_affiliations.tsv",
      source: "author",
      target: "affiliation",
    },
  ],
  main_node: "paper",
  node_to_calculate_repitition: "paper",
  emb: [
    {
      node: "paper",
      feature: "title",
      model: "XLNetTokenizer",
      min_number_of_words: 4,
    },
  ],
  weight: {
    df: "papers_venues.tsv",
    feature: "publish_year",
  },
  weight_split_range: {
    train_range: { start: 1900, end: 2015 },
    valid_range: { start: 2015, end: 2016 },
    test_range: { start: 2016, end: 2021 },
  },
};

export const NEW_GRAPH_SETTING = {
  nodes: [
    {
      name: "",
      df: "",
      features: [
        {
          feature_name: "id",
          column_name: "",
        },
      ],
    },
  ],
  edges: [
    {
      name: "",
      df: "",
      source: "",
      target: "",
      self_edge: true,
    },
  ],
  main_node: "",
  node_to_calculate_repitition: "",
  emb: [
    {
      node: "",
      feature: "",
      model: "XLNetTokenizer",
      min_number_of_words: 4,
    },
  ],
  weight: {
    df: "",
    feature: "",
  },
  weight_split_range: {
    train_range: { start: "", end: "" },
    valid_range: { start: "", end: "" },
    test_range: { start: "", end: "" },
  },
};
