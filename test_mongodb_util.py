import unittest
from unittest.mock import MagicMock, patch
from mongodb_util import MongoDBUtil

class TestMongoDBUtil(unittest.TestCase):
    @patch('mongodb_util.MongoClient')
    def setUp(self, MockMongoClient):
        self.mock_client = MockMongoClient.return_value
        self.mock_db = self.mock_client.__getitem__.return_value
        self.mock_collection = self.mock_db.__getitem__.return_value
        self.mongo_util = MongoDBUtil('mongodb://localhost:27017/', 'test_db', 'test_collection')

    def test_create_document(self):
        self.mock_collection.insert_one.return_value.inserted_id = '123'
        result = self.mongo_util.create_document({'key': 'value'})
        self.assertEqual(result, '123')
        self.mock_collection.insert_one.assert_called_once_with({'key': 'value'})

    def test_read_document(self):
        self.mock_collection.find_one.return_value = {'key': 'value'}
        result = self.mongo_util.read_document({'key': 'value'})
        self.assertEqual(result, {'key': 'value'})
        self.mock_collection.find_one.assert_called_once_with({'key': 'value'})

    def test_update_document(self):
        self.mock_collection.update_one.return_value.modified_count = 1
        result = self.mongo_util.update_document({'key': 'value'}, {'key': 'new_value'})
        self.assertEqual(result, 1)
        self.mock_collection.update_one.assert_called_once_with({'key': 'value'}, {'$set': {'key': 'new_value'}})

    def test_delete_document(self):
        self.mock_collection.delete_one.return_value.deleted_count = 1
        result = self.mongo_util.delete_document({'key': 'value'})
        self.assertEqual(result, 1)
        self.mock_collection.delete_one.assert_called_once_with({'key': 'value'})

    def tearDown(self):
        self.mongo_util.close_connection()

if __name__ == '__main__':
    unittest.main()

