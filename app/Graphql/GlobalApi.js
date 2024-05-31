import { request, gql } from "graphql-request";

const MASTER_API_KEY =
  "https://api-ap-northeast-1.hygraph.com/v2/clvl0kaql00qc07w739axm3je/master";

const getCompany = async () => {
  const query = gql`
    query getCompany {
      companies {
        logo {
          url
        }
        id
        companyName
        title
        email
        address
        image {
          id
          url
        }
        decs {
          html
          markdown
          raw
          text
        }
        jobType
        schedule
      }
    }
  `;
  const result = await request(MASTER_API_KEY, query);
  return result;
};

const appliedUser = async (data) => {
  const mutationQuery =
    gql`
    mutation AppliedUser {
      createAppliedList(
        data: {
          company: { connect: { id: "` +
    data.companyId +
    `" } }
          fullName:"` +
    data.fullName +
    `"
          userName: "` +
    data.userName +
    `"
          userEmail: "` +
    data.userEmail +
    `"
          date: "` +
    data.date +
    `"
    email: "` +
    data.email +
    `"
          address: "` +
    data.address +
    `"
    contactNumber: "` +
    data.contactNumber +
    `"
          note: "` +
    data.note +
    `"
        }
      ) {
        id
      }
      publishManyAppliedLists(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_API_KEY, mutationQuery);
  return result;
};

const getUserApplied = async (userEmail) => {
  const query =
    gql`
    query getUserApplied {
      appliedLists(orderBy: updatedAt_DESC, where: {userEmail: "` +
    userEmail +
    `"}) {
        id
        userName
        userEmail
        note
        id
        fullName
        date
        contactNumber
        address
        company {
          id
          companyName
          jobType
          email
          address
          logo {
            url
          }
          title
          image {
            url
          }
          decs {
            html
            markdown
            raw
            text
          }
        }
      }
    }
  `;

  const result = await request(MASTER_API_KEY, query);
  return result;
};

const deleteAppliedList = async (id) => {
  const mutationQuery = gql`
    mutation DeleteAppliedList {
      deleteAppliedList(where: { id: "${id}" }) {
        id
      }
    }
  `;

  const result = await request(MASTER_API_KEY, mutationQuery);
  return result;
};

export default {
  getCompany,
  appliedUser,
  getUserApplied,
  deleteAppliedList,
};
