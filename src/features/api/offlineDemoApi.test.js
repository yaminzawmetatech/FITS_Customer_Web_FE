import axios from "axios";
import { afterEach, describe, expect, it } from "vitest";
import "../../apiBlocker";
import {
  DEMO_STORAGE_KEY,
  offlineDemoAdapter,
  resetDemoDatabase,
} from "./offlineDemoApi";

const request = (path, method = "get", data, params) =>
  offlineDemoAdapter({
    baseURL: "http://localhost:8000/api/",
    url: path,
    method,
    data,
    params,
    headers: {},
  });

describe("offline demo API", () => {
  afterEach(() => {
    resetDemoDatabase();
  });

  it("serves seeded records without using the configured API URL", async () => {
    const response = await axios.get(
      "http://localhost:8000/api/user/categories"
    );

    expect(response.status).toBe(200);
    expect(response.data.data).toHaveLength(3);
    expect(response.data.data[0].name_en).toBe("Vehicle Finance");
  });

  it("keeps local edits available to later requests", async () => {
    const created = await request(
      "admin/regions",
      "post",
      JSON.stringify({ name_en: "Demo Region" })
    );
    const updated = await request(
      `admin/regions/${created.data._id}`,
      "put",
      JSON.stringify({ name_en: "Updated Demo Region" })
    );
    const list = await request("user/regions");

    expect(updated.data.data.name_en).toBe("Updated Demo Region");
    expect(
      list.data.data.find((item) => item._id === created.data._id).name_en
    ).toBe("Updated Demo Region");
    expect(localStorage.getItem(DEMO_STORAGE_KEY)).toContain(
      "Updated Demo Region"
    );
  });

  it("provides application field metadata for each sample product", async () => {
    const response = await request("user/application-field-set-up");
    const fields = response.data.data[0].application_fields;

    expect(response.data.data).toHaveLength(3);
    expect(fields.applicant_name.required).toBe(false);
    expect(fields.nrc).toBeDefined();
  });

  it("supports the supplied Laravel resource and lookup routes in demo mode", async () => {
    const routes = [
      "customer-inquiry-form",
      "apply-loan-steps",
      "our-services",
      "customer-voices",
      "fast-services",
      "questions",
      "answers",
      "document-types",
      "get-dealers",
      "users",
      "nrc-states",
      "nrc-townships",
      "get-vehicles",
      "get-customer-banks",
    ];

    for (const route of routes) {
      const response = await request(route);
      expect(response.data.data, route).toBeInstanceOf(Array);
      expect(response.data.data.length, route).toBeGreaterThan(0);
    }

    const images = await request("get-images-by-customer-web-id/123");
    expect(images.data.data).toEqual([]);
  });

  it("stores applications through the Laravel create-application route", async () => {
    const created = await request(
      "create-application",
      "post",
      JSON.stringify({ applicant_name: "Demo Applicant" })
    );
    const list = await request("create-application");

    expect(created.status).toBe(201);
    expect(list.data.data.some((item) => item.applicant_name === "Demo Applicant")).toBe(true);
  });

  it("returns an offline export for the customer inquiry export route", async () => {
    const response = await request(
      "customer-inquiry-form-export",
      "post",
      JSON.stringify({})
    );

    expect(response.data).toBeInstanceOf(Blob);
  });

  it("supports users create, update, and delete operations", async () => {
    const created = await request(
      "users",
      "post",
      JSON.stringify({ user_name: "demo-crud-user", email: "crud@example.invalid" })
    );
    const updated = await request(
      `users/${created.data._id}`,
      "put",
      JSON.stringify({ user_name: "updated-demo-user" })
    );
    const afterUpdate = await request("users");

    expect(
      afterUpdate.data.data.find((user) => user._id === created.data._id)
        .user_name
    ).toBe("updated-demo-user");

    await request(`users/${created.data._id}`, "delete");
    const afterDelete = await request("users");

    expect(
      afterDelete.data.data.some((user) => user._id === created.data._id)
    ).toBe(false);
    expect(updated.data.data.user_name).toBe("updated-demo-user");
  });
});
