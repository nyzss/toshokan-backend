export interface TagBody {
  body: {
    title: string;
    description: string;
    novelId: string;
  };
}

export interface AddNovelBody {
  body: {
    title: string;
    description: string;
    author: string;
  };
}

export interface SingleUser {
  params: {
    id: string;
  };
}

export interface UserAddReadingList {
  body: {
    id: string;
    novelId: string;
  };
}

export interface AuthCheck {
  params: {
    cookies: {
      token: string;
    };
  };
}
