from pymongo import MongoClient

class MongoDBUtil:
    def __init__(self, uri, db_name, collection_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def create_document(self, document):
        try:
            result = self.collection.insert_one(document)
            return result.inserted_id
        except Exception as e:
            print(f"An error occurred while creating a document: {e}")

    def read_document(self, query):
        try:
            document = self.collection.find_one(query)
            return document
        except Exception as e:
            print(f"An error occurred while reading a document: {e}")

    def update_document(self, query, update_values):
        try:
            result = self.collection.update_one(query, {'$set': update_values})
            return result.modified_count
        except Exception as e:
            print(f"An error occurred while updating a document: {e}")

    def delete_document(self, query):
        try:
            result = self.collection.delete_one(query)
            return result.deleted_count
        except Exception as e:
            print(f"An error occurred while deleting a document: {e}")

    def close_connection(self):
        self.client.close()

